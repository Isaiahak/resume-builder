
export function validDescription(desc: string): { string }{
	const escaped = escapeHTML(desc);
	const cleaned = escaped.replace(/[^a-zA-Z0-9 ]/g, "");
	return cleaned;	
}

function escapeHTML(str) {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#x27;' };
  return str.replace(/[&<>"']/g, (m) => map[m]);
}
