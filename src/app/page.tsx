"use client";

const TodoPage = () => {
  return (
    <div className="flex w-screen justify-center">
      <div className="gap-man_md [&>*]:text-black [&>*]:p-man_xs flex flex-col [&>*]:h-16 [&>*]:w-64">
        <div className="bg-red-500">Red</div>
        <div className="bg-red-500/50">Red (With Transparency)</div>
        <div className="bg-error">Error (From Tw)</div>
        <div className="bg-[var(--mantine-color-error)]">
          Error (From Mantine)
        </div>
        <div className="bg-primary-500">Primary</div>
        <div className="bg-secondary-500 shadow-md">Secondary (Shadow)</div>
        <div className="rounded-md bg-grape-500">Grape (Rounded)</div>
      </div>
    </div>
  );
};

export default TodoPage;
