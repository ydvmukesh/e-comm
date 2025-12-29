import Breadcrumb from '@/components/ui/Breadcrumb';

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Terms' }]} />
      <div className="mt-12 bg-white p-12 rounded-[3rem] border border-gray-100 shadow-sm space-y-8">
        <h1 className="text-4xl font-black">Terms & Conditions</h1>
        <p className="text-gray-600 leading-relaxed">By using our services, you agree to these terms.</p>
      </div>
    </div>
  );
}
