"use client";

const TodoPage = () => {
  return (
    <div className="flex flex-col gap-sm">
      <div className="h-16 w-64 bg-red-500">Red</div>
      <div className="bg-red-500/50 h-16 w-64">Red (With Transparency)</div>
      <div className="bg-error h-16 w-64">Error (From Tw)</div>
      <div className="h-16 w-64 bg-[var(--mantine-color-error)]">
        Error (From Mantine)
      </div>
      <div className="h-16 w-64 bg-primary-500">Primary</div>
      <div className="h-16 w-64 bg-secondary-500 shadow-md">
        Secondary (Shadow)
      </div>
    </div>
  );
};

export default TodoPage;
