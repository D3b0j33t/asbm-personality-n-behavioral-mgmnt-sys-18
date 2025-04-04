
import React, { createContext, useContext } from "react"

export interface ChartConfig {
  [key: string]: {
    color: string;
    label?: string;
  };
}

interface ChartContextProps {
  config?: ChartConfig;
}

const ChartContext = createContext<ChartContextProps>({
  config: {},
});

export const ChartContainer = ({
  children,
  config = {}
}: {
  children: React.ReactNode;
  config: ChartConfig;
}) => {
  return (
    <ChartContext.Provider value={{ config }}>
      {children}
    </ChartContext.Provider>
  )
}

interface ChartTooltipContentProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

export const ChartTooltipContent = ({
  active,
  payload,
  label,
}: ChartTooltipContentProps) => {
  const { config } = useContext(ChartContext);
  
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  return (
    <div className="bg-white p-2 border shadow-sm rounded-lg">
      <p className="text-xs font-medium mb-1">{label}</p>
      <div className="space-y-1">
        {payload.map((item, index) => {
          const configKey = Object.keys(config || {}).find(key => key === item.dataKey);
          const color = configKey ? config?.[configKey]?.color : item.color;
          const name = configKey ? config?.[configKey]?.label || item.name : item.name;
          
          return (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: color }}
              />
              <span className="text-xs">{name}: {item.value}</span>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default ChartContainer;
