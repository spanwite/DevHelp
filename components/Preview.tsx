import { MDXRemote } from 'next-mdx-remote/rsc';
import { Code } from 'bright';

Code.theme = {
  light: 'github-light',
  dark: 'github-dark',
  lightSelector: 'html.light',
};

export default function Preview({ content }: { content: string }) {
  return (
    <div className='prose'>
      <MDXRemote
        source={content}
        components={{
          pre: (props) => (
            <Code {...props} className='bright-code' lineNumbers />
          ),
        }}
      />
    </div>
  );
}
