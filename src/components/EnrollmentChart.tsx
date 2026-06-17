import type { FC } from 'react';

interface EnrollmentChartProps {
  data?: unknown;
}

const EnrollmentChart: FC<EnrollmentChartProps> = (): React.ReactElement => {
  return (
    <div style={{
      padding: '16px',
      textAlign: 'center',
      color: '#aaa',
    }}>
      <p style={{ fontSize: '12px' }}>Enrollment Chart Placeholder</p>
    </div>
  );
};

export default EnrollmentChart;
