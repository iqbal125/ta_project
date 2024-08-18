import { ChevronDown } from 'react-feather';

const AdminSection = () => {
  return (
    <div className="grid grid-flow-col items-center gap-2 w-[115px] h-[36px] p-[6px_11px] box-border">
      <span className="font-medium text-[16px]">Admin</span>
      <ChevronDown />
    </div>
  );
};

export default AdminSection;
