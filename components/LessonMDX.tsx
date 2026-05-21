// Server Component — renders MDX content, cannot be a client component
import { MDXRemote } from "next-mdx-remote/rsc";
import LessonTerminal from "@/components/lesson-blocks/LessonTerminal";

const mdxComponents = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="mt-12 mb-3 font-heading text-xl font-bold tracking-tight text-gray-900" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="mt-7 mb-2 font-heading text-base font-bold tracking-tight text-gray-800" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="leading-[1.8] mb-5 text-[15px]" style={{ color: "#374151" }} {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-none space-y-2 mb-5" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal list-inside space-y-2 mb-5 text-[15px]" style={{ color: "#374151" }} {...props} />
  ),
  li: ({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="flex items-start gap-2.5 text-[15px] leading-relaxed" style={{ color: "#374151" }} {...props}>
      <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "#0F766E" }} />
      <span>{children}</span>
    </li>
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code
      className="rounded-md border px-1.5 py-0.5 font-mono text-[13px]"
      style={{ backgroundColor: "#CCFBF1", color: "#0F766E", borderColor: "#99F6E4" }}
      {...props}
    />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <div className="my-6">
      <LessonTerminal
        headerNote="Example"
        prompt={false}
        bodyClassName="overflow-hidden"
        bodyStyle={{ minHeight: 0 }}
      >
        <pre
          className="overflow-x-auto p-6 text-[13px] font-mono leading-relaxed"
          style={{ color: "#86EFAC", backgroundColor: "#1A1F2E" }}
          {...props}
        />
      </LessonTerminal>
    </div>
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="border-l-4 pl-5 italic my-5 text-[15px]"
      style={{ borderColor: "#0F766E", color: "#6B7280" }}
      {...props}
    />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-gray-900" {...props} />
  ),
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse" {...props} />
    </div>
  ),
  th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className="text-left font-semibold border-b py-2 px-4 text-xs uppercase tracking-wide"
      style={{ color: "#374151", borderColor: "#E7E5E4", backgroundColor: "#F8F7F4" }}
      {...props}
    />
  ),
  td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className="py-2.5 px-4 border-b text-[14px]" style={{ borderColor: "#F3F2EF", color: "#6B7280" }} {...props} />
  ),
  Callout: ({
    type = "info",
    children,
  }: {
    type?: "info" | "warning" | "tip";
    children: React.ReactNode;
  }) => {
    const styles = {
      info: {
        background: "linear-gradient(135deg, #EFF6FF 0%, #F8FAFC 100%)",
        border: "#BFDBFE",
        labelBg: "#DBEAFE",
        labelText: "#1D4ED8",
        text: "#1E3A8A",
      },
      warning: {
        background: "linear-gradient(135deg, #FFFBEB 0%, #FFF7ED 100%)",
        border: "#FCD34D",
        labelBg: "#FEF3C7",
        labelText: "#B45309",
        text: "#92400E",
      },
      tip: {
        background: "linear-gradient(135deg, #ECFDF5 0%, #F0FDFA 100%)",
        border: "#99F6E4",
        labelBg: "#CCFBF1",
        labelText: "#0F766E",
        text: "#115E59",
      },
    };
    const labels = { info: "Note", warning: "Watch out", tip: "Tip" };
    const style = styles[type];
    return (
      <div
        className="mb-5 rounded-2xl border p-5 text-sm leading-relaxed"
        style={{ background: style.background, borderColor: style.border, color: style.text }}
      >
        <div className="mb-3 flex items-center gap-2">
          <span
            className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em]"
            style={{ backgroundColor: style.labelBg, color: style.labelText }}
          >
            {labels[type]}
          </span>
        </div>
        <div>{children}</div>
      </div>
    );
  },
  Exercise: ({ children }: { children: React.ReactNode }) => (
    <div
      className="my-8 rounded-2xl border p-6"
      style={{
        background: "linear-gradient(135deg, rgba(204,251,241,0.72) 0%, #F8F7F4 100%)",
        borderColor: "#99F6E4",
        boxShadow: "0 10px 30px rgba(15, 23, 42, 0.04)",
      }}
    >
      <div className="mb-3 flex items-center gap-2">
        <span
          className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em]"
          style={{ backgroundColor: "#CCFBF1", color: "#0F766E" }}
        >
          Exercise
        </span>
        <span className="text-[11px]" style={{ color: "#6B7280" }}>
          Try the idea before moving on.
        </span>
      </div>
      <div className="text-sm leading-relaxed" style={{ color: "#374151" }}>{children}</div>
    </div>
  ),
};

export default function LessonMDX({ source }: { source: string }) {
  return <MDXRemote source={source} components={mdxComponents} />;
}
