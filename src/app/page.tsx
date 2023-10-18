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
        <div className="rounded-md bg-pink-800 text-white dark:bg-green-800">
          Green If Dark, Pink if Light
        </div>
      </div>
    </div>
  );
};

export default TodoPage;
