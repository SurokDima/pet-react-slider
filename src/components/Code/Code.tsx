import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export default function Code({children, language}: ICodeProps) {
  return (
    <SyntaxHighlighter language={language} style={dark} customStyle={{backgroundColor: 'transparent'}}>
      {children}
    </SyntaxHighlighter>
  );
}

interface ICodeProps {
  children: string;
  language?: string;
}