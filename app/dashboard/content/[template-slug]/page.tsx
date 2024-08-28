"use client";
import React from "react";
import FormSection from "../_component/FormSection";
// import OutputSection from "../_component/OutputSection";
import { TEMPLATE } from "../../_component/TemplateListSection";
import Templates from "@/app/(data)/Templates";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { chatSession } from "@/utils/AiModal";
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema";
import moment from "moment";
const OutputSection = dynamic(() => import("../_component/OutputSection"), {
  ssr: false,
});

interface PROPS {
  params: {
    "template-slug": string;
  };
}
function CreateNewContent(props: PROPS) {
  const [loading, setLoading] = React.useState(false);
  const [aiOutput, setAiOutput] = React.useState<string>("");
  const selectedTemplate: TEMPLATE | undefined = Templates.find(
    (item: TEMPLATE) => item.slug === props.params["template-slug"]
  );
  const generateAIContent = async (formData: any) => {
    setLoading(true);
    const SelectedPrompt = selectedTemplate?.aiPrompt;
    const finalAiPrompt = JSON.stringify(formData) + ", " + SelectedPrompt;
    const result = await chatSession.sendMessage(finalAiPrompt);
    setAiOutput(result?.response?.text());
    await saveInDb(formData, selectedTemplate?.slug, result?.response?.text());
    setLoading(false);
  };
  const saveInDb = async (formData: any, slug: any, aiResp: string) => {
    await db.insert(AIOutput).values({
      formData,
      templateSlug: slug,
      aiResponse: aiResp,
      createdBy: "nishantjangid6377@gmail.com",
      createdAt: Date().toString(),
    });
  };
  return (
    <div className="p-5">
      <Link href={"/dashboard"}>
        <Button>
          <ArrowLeft /> Back
        </Button>
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-3 py-5 gap-5">
        <FormSection
          userFormInput={(v: any) => generateAIContent(v)}
          selectedTemplate={selectedTemplate}
          loading={loading}
        />
        <div className="col-span-2">
          <OutputSection aiOutput={aiOutput} />
        </div>
      </div>
    </div>
  );
}

export default CreateNewContent;
