'use client';

import { cn } from '@/lib/utils';
import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  codeBlockPlugin,
  codeMirrorPlugin,
  CodeToggle,
  CreateLink,
  diffSourcePlugin,
  DiffSourceToggleWrapper,
  headingsPlugin,
  imagePlugin,
  InsertCodeBlock,
  InsertImage,
  InsertThematicBreak,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  ListsToggle,
  markdownShortcutPlugin,
  MDXEditor,
  type MDXEditorMethods,
  type MDXEditorProps,
  quotePlugin,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  UndoRedo,
} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';
import { githubDark, githubLight } from '@uiw/codemirror-theme-github';
import { useTheme } from 'next-themes';
import { type ForwardedRef } from 'react';
import { codeBlockLanguages } from './constants';

export default function InitializedMDXEditor({
  editorRef,
  className,
  ...props
}: { editorRef: ForwardedRef<MDXEditorMethods> | null } & MDXEditorProps) {
  const { resolvedTheme } = useTheme();
  const themeExtension = resolvedTheme === 'dark' ? githubDark : githubLight;

  return (
    <MDXEditor
      key={resolvedTheme}
      className={cn(
        'markdown-editor',
        className,
        resolvedTheme === 'dark' && 'dark'
      )}
      contentEditableClassName='markdown-content-editable prose'
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        codeBlockPlugin(),
        imagePlugin(),
        linkPlugin(),
        linkDialogPlugin(),
        tablePlugin(),
        diffSourcePlugin({
          codeMirrorExtensions: [themeExtension],
        }),
        thematicBreakPlugin(),
        codeMirrorPlugin({
          codeMirrorExtensions: [themeExtension],
          codeBlockLanguages,
          autoLoadLanguageSupport: true,
        }),
        toolbarPlugin({
          toolbarContents: () => (
            <DiffSourceToggleWrapper options={['rich-text', 'source']}>
              <BlockTypeSelect />
              <BoldItalicUnderlineToggles />
              <CodeToggle />
              <InsertThematicBreak />
              <CreateLink />
              <ListsToggle />
              <InsertImage />
              <InsertCodeBlock />
              <UndoRedo />
            </DiffSourceToggleWrapper>
          ),
        }),
      ]}
      {...props}
      ref={editorRef}
    />
  );
}
