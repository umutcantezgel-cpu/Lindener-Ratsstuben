import React from 'react';

export default function Quote({ text, marginTop, marginBottom }: { text: string; marginTop?: string; marginBottom?: string }) {
  return (
    <div className="qt" style={{ marginTop, marginBottom }}>
      <div className="qt-txt">&quot;{text}&quot;</div>
    </div>
  );
}
