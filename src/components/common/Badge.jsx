import React from 'react';
import { getStatusBadgeInfo } from '../../utils/gradeCalculations';

export default function Badge({ status, customLabel, className = "" }) {
  const info = getStatusBadgeInfo(status);
  const label = customLabel || info.label;

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${info.color} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 opacity-80"></span>
      {label}
    </span>
  );
}
