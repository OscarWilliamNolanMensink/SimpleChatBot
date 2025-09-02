import diagram from '../assets/zephyr-7b-beta-spoder-diagram.png';

export default function ZephyrInfo() {
  return (
    <section className="p-4 rounded-xl shadow-md bg-white">
      <h2 className="text-xl font-bold mb-2">Zephyr-7B-Beta Usage</h2>
      <p className="mb-4 text-gray-700">
        This application makes use of the open-source <strong>Zephyr-7B-Beta</strong> model, available on <a 
          href="https://huggingface.co/HuggingFaceH4/zephyr-7b-beta"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        > Hugging Face </a>.
        
        The diagram below illustrates what it is good at compared to other chat models on Huggingface.
      </p>
      <img 
        src={diagram} 
        alt="Zephyr-7B-Beta integration diagram" 
        className="w-full rounded-lg border" 
      />
      <p className="mt-2 text-sm text-gray-500">
        Source: Hugging Face community release. Used under the terms of its open-source license.
      </p>
    </section>
  );
}