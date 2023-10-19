"use client";

const TodoPage = () => {
  return (
    <div className="flex w-screen justify-center">
      <div className="flex flex-col gap-man_md [&>*]:h-16 [&>*]:w-64 [&>*]:p-man_xs [&>*]:text-black">
        <div className="bg-red-500">Red</div>
        <div className="bg-red-500/50">Red (With Transparency)</div>
        <div className="bg-error">Error (From Tw)</div>
        <div className="bg-[var(--mantine-color-error)]">
          Error (From Mantine)
        </div>
        <div className="bg-primary-500">Primary</div>
        <div className="bg-secondary-500 shadow-md">Secondary (Shadow)</div>
        <div className="rounded-md bg-grape-500">Grape (Rounded)</div>
        <div className="rounded-md bg-pink-400 dark:bg-green-800 dark:text-white">
          Green If Dark, Pink if Light
        </div>
        <div className="border-textColor !text-textColor leading-xl border font-mono text-xs">
          With Text Color Border, Small Text, Mono Font, Big Line Height
        </div>
        <div className="border-textColor !text-textColor font-heading border text-xl">
          Border, Heading Font, Big Text
        </div>
      </div>
    </div>
  );
};

export default TodoPage;
