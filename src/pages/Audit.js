import React from "react"
import "./Audit.css"

export function Audit({ noAudits, context, amount }) {
	if (noAudits) return <div className="noAudits">(Nothing to display)</div>

	return (
		<div className="audit">
        <div className="audit_context">
            ${amount}
        </div>
			<div className="audit_context">
				{context}
			</div>
				
			
		</div>
	)
}
export default Audit