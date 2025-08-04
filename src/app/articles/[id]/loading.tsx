import { ArticleSkeleton } from "@/components/ArticleSkeleton";
import React from "react";

type Props = {};

const loading = (props: Props) => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <ArticleSkeleton />
    </div>
  );
};

export default loading;
