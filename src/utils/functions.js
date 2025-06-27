export function getFilterOptions(options, stats, activeFilter) {
  const { completed = 0, pending = 0, total = 0 } = stats;

  return options.map((option) => {
    let label = "";

    switch (option.value) {
      case "completed":
        label = `${completed} Completed`;
        break;
      case "pending":
        label = `${pending} Pending`;
        break;
      case "all":
        label = `${total} Total`;
        break;
      default:
        label = option.value;
    }

    return {
      ...option,
      label,
      isActive: option.value === activeFilter,
    };
  });
}

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};
