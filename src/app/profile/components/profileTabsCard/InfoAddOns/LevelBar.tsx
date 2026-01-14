type XPProgressProps = {
  currentXP: number;
  length?: number | string;
  minXP?: number;
  maxXP?: number;
  baseLevel?: number;
  nextLevel?: number;
  text: boolean;
};

export default function LevelBar({
  currentXP,
  length = "100%",
  minXP = 0,
  maxXP = 0,
  baseLevel = 0,
  nextLevel = 0,
  text = true,
}: XPProgressProps){
  const percentage = Math.min((currentXP / maxXP) * 100, 100);

  const textElement = text ? <span>{`${currentXP} / ${maxXP} XP`}</span> : <span></span>;

  const outerStyle: React.CSSProperties = typeof length === "number" ? { width: length } : { width: length };

  return (
    <div style={outerStyle}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span>{baseLevel}</span>

        <div style={styles.bar}>
          <div
            style={{
              ...styles.fill,
              width: `${percentage}%`,
            }}
          />
        </div>

        <span>{nextLevel}</span>
      </div>

      <div style={styles.text}>
        {textElement}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  bar: {
    flex: 1,
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 999,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: '#14B8A6',
    borderRadius: 999,
    transition: 'width 0.3s ease',
  },
  text: {
    marginTop: 1,
    textAlign: 'center',
    fontSize: 12,
    color: '#6B7280',
  },
};

export { LevelBar };