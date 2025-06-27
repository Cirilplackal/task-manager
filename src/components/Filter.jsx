export default function Filters({ options = [], active, onFilterChange }) {
  return (
    <div className="flex items-center justify-center mt-4 space-x-6 text-sm text-gray-500">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onFilterChange(option.value)}
          className={`flex items-center transition-colors ${
            active === option.value ? `${option.activeClass} font-semibold px-2` : ""
          }`}
        >
          <div className={`w-2 h-2 rounded-full mr-2 ${option.dotClass}`} />
          {option.label}
        </button>
      ))}
    </div>
  );
}
