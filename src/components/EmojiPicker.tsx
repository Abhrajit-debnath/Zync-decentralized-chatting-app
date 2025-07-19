'use client';

import { useState } from 'react';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';

interface EmojiPickerProps {
  onSelect: (emoji: any) => void;
}

export default function EmojiPicker({ onSelect }: EmojiPickerProps) {
  const [show, setShow] = useState(false);

  return (
    <div className="absolute left-4 top-1/2 -translate-y-1/2">
      <button
        onClick={() => setShow(!show)}
        className="cursor-pointer"
        type="button"
      >
        😊
      </button>

      {show && (
        <div className="absolute bottom-18 mb-2 z-50">
          <Picker
            data={data}
            onEmojiSelect={(emoji:string) => {
              onSelect(emoji);
              setShow(false); 
            }}
            theme="dark"
            emoji="point_up"
            previewPosition="none"
          />
        </div>
      )}
    </div>
  );
}
