import PriorityBadge from "./PriorityBadge";
import StatusBadge from "./StatusBadge";

function IncidentRow({
  request,
  handleStatusUpdate,
  onView
}) {

  const icons = {
    fire: "🔥",
    medical: "🚑",
    rescue: "🛟",
    flood: "🌊",
    food: "🍞",
    water: "💧",
    general: "⚠️"
  };

  const priority = request.priority || "low";

  return (

    <tr
      style={{
        backgroundColor:
          priority === "critical"
            ? "#fff5f5"
            : "white",

        borderLeft:
          priority === "critical"
            ? "5px solid #DC2626"
            : priority === "high"
            ? "5px solid #F59E0B"
            : priority === "medium"
            ? "5px solid #2563EB"
            : "5px solid transparent",

        verticalAlign: "middle"
      }}
    >

      <td className="fw-semibold">
        #{request.id}
      </td>

      <td>
        <PriorityBadge
          priority={priority}
        />
      </td>

      <td
        style={{
          fontSize: "24px",
          textAlign: "center"
        }}
      >
        {icons[request.category] || "🚨"}
      </td>

      <td>

        <div
          style={{
            maxWidth: "280px",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            fontWeight: 600
          }}
          title={request.message}
        >
          {request.message}
        </div>

      </td>

      <td>

        {request.recommended_resource || "-"}

      </td>

      <td>

        <StatusBadge
          status={request.status || "pending"}
        />

      </td>

      <td>

        {request.created_at
          ? new Date(
              request.created_at
            ).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit"
            })
          : "-"}

      </td>

      <td>

        <div className="d-flex gap-2">

          <button
            className="btn btn-sm btn-outline-primary"
            onClick={() => onView(request)}
          >
            Details
          </button>

          {request.status !== "resolved" && (

            <button
              className="btn btn-sm btn-success"
              onClick={() =>
                handleStatusUpdate(
                  request.id,
                  "resolved"
                )
              }
            >
              ✓ Resolve
            </button>

          )}

        </div>

      </td>

    </tr>

  );

}

export default IncidentRow;