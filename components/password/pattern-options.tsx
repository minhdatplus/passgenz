import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Info } from "lucide-react"
import { useTranslations } from 'next-intl'

interface PatternOptionsProps {
  pattern: string;
  onChange: (pattern: string) => void;
}

export function PatternOptions({ pattern, onChange }: PatternOptionsProps) {
  const t = useTranslations('Components.PasswordGenerator.context');

  const patternGuide = {
    'L': t('patternGuide.uppercase'),
    'l': t('patternGuide.lowercase'),
    'd': t('patternGuide.digit'),
    's': t('patternGuide.special'),
  };

  // Validate pattern format
  const isValidPattern = (value: string) => {
    return /^[Llds]+$/.test(value);
  };

  // Example based on current pattern
  const getPatternExample = (pattern: string) => {
    if (!pattern) return '';
    return pattern.split('').map(char => {
      switch (char) {
        case 'L': return 'A';
        case 'l': return 'a';
        case 'd': return '1';
        case 's': return '@';
        default: return char;
      }
    }).join('');
  };

  return (
    <div className="space-y-6">
      {/* Pattern Input */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">{t('patternTemplate')}</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent className="w-80">
                <div className="space-y-2">
                  <p className="font-medium">{t('patternGuide.title')}:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(patternGuide).map(([key, desc]) => (
                      <div key={key} className="flex items-center gap-2">
                        <code className="bg-muted px-1 rounded">{key}</code>
                        <span className="text-sm">{desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <Input
          value={pattern}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Example: LLddss"
          className="font-mono"
          spellCheck={false}
        />

        {/* Pattern Preview */}
        {pattern && (
          <div className="space-y-2">
            <Label className="text-sm text-muted-foreground">{t('preview')}:</Label>
            <div className="p-2 bg-muted rounded-md font-mono text-sm">
              {getPatternExample(pattern)}
            </div>
          </div>
        )}
      </div>

      {/* Pattern Guide */}
      <Alert className="bg-muted/50">
        <AlertDescription className="text-sm">
          <p className="mb-2">{t('examples')}:</p>
          <ul className="space-y-1 text-muted-foreground">
            <li><code className="bg-muted px-1 rounded">Lldd</code> → Ab12</li>
            <li><code className="bg-muted px-1 rounded">LLLddd</code> → ABC123</li>
            <li><code className="bg-muted px-1 rounded">Lldss</code> → Ab1@#</li>
          </ul>
        </AlertDescription>
      </Alert>

      {/* Validation Warning */}
      {pattern && !isValidPattern(pattern) && (
        <Alert variant="destructive" className="text-sm">
          <AlertDescription>
            {t('validationWarning')}
          </AlertDescription>
        </Alert>
      )}

      <p className="text-xs text-muted-foreground">
        {t('patternInstructions')}
      </p>
    </div>
  );
} 