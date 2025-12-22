const TAG_COLORS = ["sage", "sky", "lavender", "peach", "honey", "mint", "rose", "sand"] as const;
type TagColor = (typeof TAG_COLORS)[number];

/**
 * Returns a consistent color for a specialty string.
 *
 * How it works:
 * 1. Convert string to array of characters: "ADHD" → ["A", "D", "H", "D"]
 * 2. Get ASCII code for each character: [65, 68, 72, 68]
 * 3. Sum the codes: 65 + 68 + 72 + 68 = 273
 * 4. Use modulo to get an index within bounds: 273 % 8 = 1
 * 5. Return the color at that index: TAG_COLORS[1] = "sky"
 *
 * The same string always produces the same sum, so colors are consistent.
 * Different strings will usually get different colors, adding visual variety.
 * With 8 colors and 27 specialties, some will share colors (this is expected).
 */
function getTagColor(specialty: string): TagColor {
  const charSum = specialty.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return TAG_COLORS[charSum % TAG_COLORS.length];
}

const TAG_COLOR_CLASSES: Record<TagColor, string> = {
  sage: "bg-tag-sage-bg text-tag-sage-text",
  sky: "bg-tag-sky-bg text-tag-sky-text",
  lavender: "bg-tag-lavender-bg text-tag-lavender-text",
  peach: "bg-tag-peach-bg text-tag-peach-text",
  honey: "bg-tag-honey-bg text-tag-honey-text",
  mint: "bg-tag-mint-bg text-tag-mint-text",
  rose: "bg-tag-rose-bg text-tag-rose-text",
  sand: "bg-tag-sand-bg text-tag-sand-text",
};

interface SpecialtyTagProps {
  specialty: string;
}

export function SpecialtyTag({ specialty }: SpecialtyTagProps) {
  const colorClass = TAG_COLOR_CLASSES[getTagColor(specialty)];

  return (
    <span className={`rounded-full px-3 py-1 text-sm font-medium ${colorClass}`}>
      {specialty}
    </span>
  );
}
