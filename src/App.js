import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
import { pdfjs } from "react-pdf"; 
import Display from "./COMPONENT/Display";

// Set the workerSrc to avoid module import issues
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function App() {
  const docs = [{ uri: "/Display.pdf" }];

  return (
    <div className="App">
      <Display />
      {/* <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} /> */}
    </div>
  );
}

export default App;
