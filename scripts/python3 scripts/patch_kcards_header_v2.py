#!/usr/bin/env python3
from pathlib import Path
import textwrap

path = Path("src/components/k-cards/KCardsPage.tsx")

if not path.exists():
  raise SystemExit(f"File not found: {path}")

original = path.read_text()
text = original

# 1) Remove CardDescription + shadow from the Header card only
old_header_card = textwrap.dedent("""\
              <Card
                className="rounded-2xl shadow-sm"
                style={{ backgroundColor: "var(--color-surface)" }}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold text-[var(--color-text)]">
                    Header
                  </CardTitle>
                  <CardDescription
                    className="text-xs"
                    style={{ color: "var(--color-subtle)" }}
                  >
                    Profile layout, avatar, title and subtitle for your K-Card.
                  </CardDescription>
                </CardHeader>
""")

new_header_card = textwrap.dedent("""\
              <Card
                className="rounded-2xl"
                style={{ backgroundColor: "var(--color-surface)" }}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold text-[var(--color-text)]">
                    Header
                  </CardTitle>
                </CardHeader>
""")

if old_header_card not in text:
  raise ValueError("Could not find Header Card block for replacement.")
text = text.replace(old_header_card, new_header_card, 1)

# 2) Slim the avatar button wrapper (remove bg / ring) and enlarge image to fill
old_avatar_button = (
  '            <button\n'
  '              type="button"\n'
  '              onClick={openPicker}\n'
  '              className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-bg)] ring-2 ring-transparent transition hover:ring-[var(--color-accent)]"\n'
  "            >"
)

new_avatar_button = (
  '            <button\n'
  '              type="button"\n'
  '              onClick={openPicker}\n'
  '              className="group relative flex h-12 w-12 items-center justify-center rounded-full transition hover:scale-[1.02]"\n'
  "            >"
)

if old_avatar_button not in text:
  raise ValueError("Could not find avatar button block.")
text = text.replace(old_avatar_button, new_avatar_button, 1)

old_avatar_img = (
  '              {avatarPreview ? (\n'
  '                <img\n'
  '                  src={avatarPreview}\n'
  '                  alt="Profile preview"\n'
  '                  className="h-11 w-11 rounded-full object-cover"\n'
  "                />\n"
  "              ) : (\n"
  '                <UserCircle2 className="h-7 w-7" />\n'
  "              )}\n"
)

new_avatar_img = (
  '              {avatarPreview ? (\n'
  '                <img\n'
  '                  src={avatarPreview}\n'
  '                  alt="Profile preview"\n'
  '                  className="h-12 w-12 rounded-full object-cover"\n'
  "                />\n"
  "              ) : (\n"
  '                <UserCircle2 className="h-7 w-7" />\n'
  "              )}\n"
)

if old_avatar_img not in text:
  raise ValueError("Could not find avatar img block.")
text = text.replace(old_avatar_img, new_avatar_img, 1)

# 3) Remove the "Profile image" label text to keep things minimal
old_profile_label = (
  '            <div className="flex-1 space-y-2">\n'
  '              <p className="text-xs font-semibold text-[var(--color-text)]">\n'
  "                Profile image\n"
  "              </p>\n"
)

new_profile_label = (
  '            <div className="flex-1 space-y-2">\n'
)

if old_profile_label not in text:
  raise ValueError("Could not find Profile image label block.")
text = text.replace(old_profile_label, new_profile_label, 1)

# 4) Restyle Title input inside HeaderSection
old_title_input = textwrap.dedent("""\
                <div className="space-y-1.5">
                  <label className="text-[11px] font-medium text-[var(--color-subtle)]">
                    Title
                  </label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="h-9 rounded-2xl text-sm"
                    style={{
                      backgroundColor: "var(--color-bg)",
                      color: "var(--color-text)",
                      borderColor: "var(--color-border)",
                    }}
                    maxLength={40}
                  />
                </div>
""")

new_title_input = textwrap.dedent("""\
                <div className="space-y-1.5">
                  <label className="text-[11px] font-medium text-[var(--color-subtle)]">
                    Title
                  </label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="h-6 border-0 bg-transparent p-0 text-sm font-semibold focus-visible:outline-none focus-visible:ring-0"
                    style={{
                      backgroundColor: "transparent",
                      color: "var(--color-text)",
                      boxShadow: "none",
                      borderBottom: "1px solid var(--color-border)",
                      borderRadius: 0,
                    }}
                    maxLength={40}
                  />
                </div>
""")

if old_title_input not in text:
  raise ValueError("Could not find Title input block.")
text = text.replace(old_title_input, new_title_input, 1)

# 5) Restyle Subtitle textarea inside HeaderSection
old_subtitle_input = textwrap.dedent("""\
                <div className="space-y-1.5">
                  <label className="text-[11px] font-medium text-[var(--color-subtle)]">
                    Subtitle
                  </label>
                  <Textarea
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    rows={2}
                    className="rounded-2xl text-sm"
                    style={{
                      backgroundColor: "var(--color-bg)",
                      color: "var(--color-text)",
                      borderColor: "var(--color-border)",
                    }}
                    maxLength={80}
                  />
                </div>
""")

new_subtitle_input = textwrap.dedent("""\
                <div className="space-y-1.5">
                  <label className="text-[11px] font-medium text-[var(--color-subtle)]">
                    Subtitle
                  </label>
                  <Textarea
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    rows={2}
                    className="min-h-[40px] resize-none border-0 bg-transparent p-0 text-xs text-[var(--color-subtle)] focus-visible:outline-none focus-visible:ring-0"
                    style={{
                      backgroundColor: "transparent",
                      color: "var(--color-subtle)",
                      boxShadow: "none",
                      borderBottom: "1px solid var(--color-border)",
                      borderRadius: 0,
                    }}
                    maxLength={80}
                  />
                </div>
""")

if old_subtitle_input not in text:
  raise ValueError("Could not find Subtitle textarea block.")
text = text.replace(old_subtitle_input, new_subtitle_input, 1)

# 6) Make social chips vivid accent instead of pale accent-soft
old_social_chip = textwrap.dedent("""\
              {socials.map((name) => {
                const Icon = socialIconMap[name];
                if (!Icon) return null;
                const active = true;
                return (
                  <button
                    key={name}
                    type="button"
                    onClick={() => onToggleSocial(name)}
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full border text-[13px] transition",
                      active
                        ? "border-transparent bg-[var(--color-accent-soft)]"
                        : "border-[var(--color-border)] bg-[var(--color-bg)]"
                    )}
                    style={{
                      color: "var(--color-text)",
                    }}
                  >
                    <Icon className="h-4 w-4" />
                  </button>
                );
              })}
""")

new_social_chip = textwrap.dedent("""\
              {socials.map((name) => {
                const Icon = socialIconMap[name];
                if (!Icon) return null;
                const active = true;
                return (
                  <button
                    key={name}
                    type="button"
                    onClick={() => onToggleSocial(name)}
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full border text-[13px] transition",
                      active
                        ? "border-transparent bg-[var(--color-accent)]"
                        : "border-[var(--color-border)] bg-[var(--color-bg)]"
                    )}
                    style={{
                      color: active ? "#050505" : "var(--color-text)",
                    }}
                  >
                    <Icon className="h-4 w-4" />
                  </button>
                );
              })}
""")

if old_social_chip not in text:
  raise ValueError("Could not find social chip block.")
text = text.replace(old_social_chip, new_social_chip, 1)

# 7) Add simple handle inputs under the social chips (local to HeaderSection)
# We insert AFTER the chips container.
chips_block = textwrap.dedent("""\
            <div className="flex flex-wrap items-center gap-2">
              {socials.map((name) => {
                const Icon = socialIconMap[name];
                if (!Icon) return null;
                const active = true;
                return (
                  <button
                    key={name}
                    type="button"
                    onClick={() => onToggleSocial(name)}
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full border text-[13px] transition",
                      active
                        ? "border-transparent bg-[var(--color-accent)]"
                        : "border-[var(--color-border)] bg-[var(--color-bg)]"
                    )}
                    style={{
                      color: active ? "#050505" : "var(--color-text)",
                    }}
                  >
                    <Icon className="h-4 w-4" />
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() => setIsSocialDialogOpen(true)}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)] transition hover:bg-[var(--color-surface)]"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
""")

chips_with_handles = chips_block + textwrap.dedent("""\

            {socials.length > 0 && (
              <div className="mt-3 space-y-2">
                {socials.map((name) => (
                  <div key={name} className="flex items-center gap-2 text-[11px]">
                    <span
                      className="w-20 shrink-0 text-[10px] uppercase tracking-[0.12em]"
                      style={{ color: "var(--color-subtle)" }}
                    >
                      {name}
                    </span>
                    <Input
                      placeholder={`@your${name.toLowerCase()}`}
                      className="h-7 flex-1 rounded-full border bg-[var(--color-bg)] px-3 text-[11px]"
                      style={{
                        borderColor: "var(--color-border)",
                        color: "var(--color-text)",
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
""")

if chips_block not in text:
  raise ValueError("Could not find chips block to attach handles.")
text = text.replace(chips_block, chips_with_handles, 1)

# Note: handle inputs are local UI only (no persistence yet).

if text == original:
  raise SystemExit("No changes made (file already patched?).")

backup_path = path.with_suffix(".tsx.bak_kcards_header_v2")
backup_path.write_text(original)
path.write_text(text)

print(f"Patched {path}")
print(f"Backup written to {backup_path}")
