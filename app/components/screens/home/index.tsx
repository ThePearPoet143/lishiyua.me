import React from "react";
import { Footer } from "../../footer";

const Spacer = () => <div style={{ marginTop: "24px" }} />;

export default function Home() {
  return (
    <div>
      <div className="flex justify-between">
        <div>
          <h1>Shiyuan</h1>
          <h2>Digital garden</h2>
        </div>
      </div>
      <Spacer />
      <p>
        My Digital Garden is a public notebook where I share my thoughts, ideas,
        and experiences. It's a work in progress, just like me. some of the
        notes are more polished than others, and some are just rough ideas.
      </p>
      <Footer />
    </div>
  );
}
