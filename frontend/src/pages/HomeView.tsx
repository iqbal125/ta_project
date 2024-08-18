import HeaderSection from '@/components/Header';
import AdminSection from '@/components/Admin';
import TextInput from '@/components/TextInput';

function TextAnalyzerUI() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <AdminSection />
      <HeaderSection />
      <TextInput />
    </div>
  );
}

export default TextAnalyzerUI;
