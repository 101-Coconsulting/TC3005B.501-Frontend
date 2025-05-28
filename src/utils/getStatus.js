export function getStatusProps(status) {
    switch (status.toLowerCase()) {
      case "aprobado":
      case "aproved":
        return { label: "Aprobado", class: "bg-green-100 text-green-700" };
      case "pendiente":
      case "pending":
        return { label: "Pendiente", class: "bg-yellow-100 text-yellow-700" };
      case "rechazado":
      case "declined":
        return { label: "Rechazado", class: "bg-red-100 text-red-700" };
      default:
        return { label: status, class: "bg-gray-100 text-gray-700" };
    }
  }
  