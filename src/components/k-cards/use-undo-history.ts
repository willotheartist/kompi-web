"use client";

import { useCallback, useEffect, useRef, useState } from "react";

function shallowEqual<T extends Record<string, unknown>>(a: T, b: T) {
  const keys = Object.keys(a);
  return keys.length === Object.keys(b).length && keys.every((k) => Object.is(a[k], b[k]));
}

/**
 * Undo/redo for a snapshot of editor state.
 * Rapid changes (typing, dragging a slider) are grouped into one step: a new step starts
 * after `groupMs` of inactivity. Changes in the first moment after mount are ignored so
 * initial normalisation doesn't become an undo step.
 */
export function useUndoHistory<T extends Record<string, unknown>>(snapshot: T, apply: (s: T) => void, { groupMs = 700, limit = 80 } = {}) {
  const past = useRef<T[]>([]);
  const future = useRef<T[]>([]);
  const latest = useRef(snapshot);
  const grouping = useRef(false);
  const groupTimer = useRef<number | null>(null);
  const ready = useRef(false);
  const [sizes, setSizes] = useState({ past: 0, future: 0 });
  const sync = useCallback(() => setSizes({ past: past.current.length, future: future.current.length }), []);

  useEffect(() => {
    const t = window.setTimeout(() => (ready.current = true), 1000);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (shallowEqual(snapshot, latest.current)) return;
    if (!ready.current) {
      latest.current = snapshot;
      return;
    }
    if (!grouping.current) {
      past.current.push(latest.current);
      if (past.current.length > limit) past.current.shift();
      future.current = [];
      sync();
    }
    grouping.current = true;
    if (groupTimer.current) window.clearTimeout(groupTimer.current);
    groupTimer.current = window.setTimeout(() => (grouping.current = false), groupMs);
    latest.current = snapshot;
  }, [snapshot, groupMs, limit, sync]);

  const step = useCallback(
    (from: React.MutableRefObject<T[]>, to: React.MutableRefObject<T[]>) => {
      const target = from.current.pop();
      if (!target) return null;
      const before = latest.current;
      to.current.push(before);
      grouping.current = false;
      latest.current = target; // so applying it isn't recorded as a new change
      apply(target);
      sync();
      return { before, after: target };
    },
    [apply, sync],
  );

  const undo = useCallback(() => step(past, future), [step]);
  const redo = useCallback(() => step(future, past), [step]);

  return { undo, redo, canUndo: sizes.past > 0, canRedo: sizes.future > 0 };
}
