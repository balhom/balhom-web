import "./dashboard-chart-tooltip.css";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  labelFormatter: (label: any) => string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formatter: (value: any) => string;
}

export function dashboardChartTooltip({ labelFormatter, formatter }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="dashboard-chart-tooltip">
          <p className="dashboard-chart-tooltip-label">
            {labelFormatter(label)}
          </p>
          <ul className="recharts-tooltip-item-list">
            {payload.map(
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (pld: any) => {
                return (
                  <li
                    key={pld.name + "-" + pld.value}
                    className="recharts-tooltip-item"
                    style={{ color: pld.color, display: "block" }}
                  >
                    <span className="recharts-tooltip-item-name">
                      {pld.name}
                    </span>
                    <span className="recharts-tooltip-item-separator"> : </span>
                    <span className="recharts-tooltip-item-value">
                      {formatter(pld.value)}
                    </span>
                    <span className="recharts-tooltip-item-unit"></span>
                  </li>
                );
              }
            )}
          </ul>
        </div>
      );
    }

    return null;
  };
}
