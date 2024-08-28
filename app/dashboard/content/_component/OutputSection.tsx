import React, { useEffect } from "react";
import "@toast-ui/editor/dist/toastui-editor.css";

import { Editor } from "@toast-ui/react-editor";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Copy } from "lucide-react";

interface PROPS {
  aiOutput: string;
}

function OutputSection({ aiOutput }: PROPS) {
  const { toast } = useToast();
  const editorRef = React.useRef<Editor>(null);
  const handleCopy = (data: string) => {
    toast({
      title: "AI Resposne copied to clipboard",
    });
    navigator.clipboard.writeText(data);
  };
  useEffect(() => {
    const editorInstance = editorRef.current?.getInstance();
    editorInstance?.setMarkdown(aiOutput);
  }, [aiOutput]);
  return (
    <div className="bg-white shadow-lg border rounded-lg">
      <div className="justify-between items-center p-5 flex">
        <h2 className="font-medium text-lg">Your Results</h2>
        <Button className="flex gap-2" onClick={() => handleCopy(aiOutput)}>
          <Copy className="w-4 h-4" /> Copy
        </Button>
      </div>
      <Editor
        ref={editorRef}
        initialValue="Your result will appear here"
        initialEditType="wysiwyg"
        height="600px"
        useCommandShortcut={true}
        // onChange={() => console.log(editorRef.current?.getInstance())}
      />
    </div>
  );
}

export default OutputSection;
