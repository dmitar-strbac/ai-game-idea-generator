export default function LayoutVisualizer({ layout }) {
  if (!layout) return null;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${layout[0].length}, 25px)`,
        gap: "3px",
        justifyContent: "center",
        marginTop: "1rem",
      }}
    >
      {layout.flat().map((cell, i) => (
        <div
          key={i}
          style={{
            width: 25,
            height: 25,
            background:
              cell === 1 ? "#38bdf8" : cell === 2 ? "#ef4444" : "#1e293b",
            borderRadius: "3px",
          }}
        />
      ))}
    </div>
  );
}
