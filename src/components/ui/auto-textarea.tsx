import * as React from 'react';
import { cn } from '@/lib/utils';

interface AutoTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  maxLength?: number;
  showCounter?: boolean;
}

export const AutoTextarea = React.forwardRef<HTMLTextAreaElement, AutoTextareaProps>(
  ({ className, maxLength = 5000, showCounter = true, onChange, ...props }, ref) => {
    const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);
    const currentLength = props.value?.toString().length || 0;

    // Auto-resize functionality
    const adjustHeight = () => {
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = `${Math.min(textarea.scrollHeight, 300)}px`; // Max height 300px
      }
    };

    React.useEffect(() => {
      adjustHeight();
    }, [props.value]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      adjustHeight();
      if (onChange) {
        onChange(e);
      }
    };

    const setRefs = (node: HTMLTextAreaElement) => {
      textareaRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    };

    return (
      <div className="relative">
        <textarea
          className={cn(
            "flex min-h-[80px] w-full rounded-lg border border-input bg-background px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none transition-all",
            className
          )}
          ref={setRefs}
          maxLength={maxLength}
          onChange={handleChange}
          {...props}
        />
        {showCounter && (
          <div className="absolute bottom-3 right-4 text-xs text-muted-foreground">
            <span className={cn(
              "transition-colors",
              currentLength > maxLength * 0.9 && "text-destructive",
              currentLength >= maxLength && "text-destructive font-medium"
            )}>
              {currentLength}
            </span>
            /{maxLength}
          </div>
        )}
      </div>
    );
  }
);

AutoTextarea.displayName = "AutoTextarea";