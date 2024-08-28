"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema";
import { desc, eq } from "drizzle-orm";
import Image from "next/image";
import Templates from "@/app/(data)/Templates";
import React, { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface HISTORY {
  id: number;
  formData: string;
  aiResponse: string | null;
  templateSlug: string;
  createdBy: string | null;
  createdAt: string | null;
}
function History() {
  const { toast } = useToast();
  const [data, setData] = useState<HISTORY[]>([]);
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    setLoading(true);
    try {
      //   const user = await currentUser();

      //   if (user) {
      // const userId = user.id;
      const results = await db
        .select()
        .from(AIOutput)
        .where(eq(AIOutput.createdBy, "nishantjangid6377@gmail.com"))
        .orderBy(desc(AIOutput.createdAt));

      setData(results);
      //   } else {
      //   console.error("No user logged in");
      //   }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleCopy = (data: string) => {
    toast({
      title: "AI Resposne copied to clipboard",
    });
    navigator.clipboard.writeText(data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  if (loading) {
    return (
      <div className="flex space-x-2 justify-center items-center bg-slate-100 h-screen dark:invert">
        <span className="sr-only">Loading...</span>
        <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-8 w-8 bg-black rounded-full animate-bounce"></div>
      </div>
    );
  }
  return (
    <div className="bg-white rounded-md m-4 p-5">
      <header className="flex justify-between items-center">
        <div>
          <h1>History</h1>
          <h2 className="text-gray-500 text-sm">Search your previously generate Al content</h2>
        </div>
        <Button onClick={fetchData}>Refresh</Button>
      </header>
      <div>
        <table className="w-full border-collapse">
          <thead className="border-b">
            <tr>
              <th
                scope="col"
                className="text-lg font-medium text-gray-500 px-6 py-4 text-left w-1/6"
              >
                Template
              </th>
              <th scope="col" className="text-lg font-medium text-gray-500 px-6 py-4 text-left">
                AI Response
              </th>
              <th scope="col" className="text-lg font-medium text-gray-500 px-6 py-4 text-left ">
                Date
              </th>
              <th
                scope="col"
                className="text-lg font-medium text-gray-500 px-6 py-4 text-center w-1/6"
              >
                Words
              </th>
              <th scope="col" className="text-lg font-medium text-gray-500 px-6 py-4 text-left">
                Copy
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => {
              const template = Templates.find((t) => t.slug === item.templateSlug);
              return (
                <tr key={item.id} className="border-b ">
                  <td className=" mx-4 my-3">
                    {template && (
                      <div className="flex items-center gap-3 ">
                        <Image src={template.icon} alt={template.name} width={40} height={40} />
                        {template.name}
                      </div>
                    )}
                  </td>
                  <td className="line-clamp-3 mx-4 my-3  ">{item.aiResponse || ""}</td>
                  <td className="mx-4 my-3 text-center">
                    {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ""}
                  </td>
                  <td className="mx-4 my-3 text-center">
                    {item.aiResponse ? item.aiResponse.split(" ").length : 0}
                  </td>
                  <td className="text-center">
                    <Button variant="ghost" onClick={() => handleCopy(item?.aiResponse || "")}>
                      Copy
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default History;
