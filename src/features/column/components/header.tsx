function ColumnHeader({
  children,
  ref,
}: {
  children: React.ReactNode;
  ref?: React.Ref<HTMLDivElement>;
}) {
  return (
    <div
      className="sticky top-0 z-10 bg-background shadow-sm border-b"
      ref={ref}
    >
      <div className="border border-b-0  bg-card rounded-t-xl p-2 flex items-center justify-between">
        {children}
      </div>
    </div>
  );
}

export { ColumnHeader };
