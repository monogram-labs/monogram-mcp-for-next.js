import {
	ArrowRightIcon,
	CodeBracketIcon,
	DocumentTextIcon,
	CogIcon,
} from '@heroicons/react/24/outline'

export default function Page() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800">
			<div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%23ffffff%22%20fill-opacity=%220.03%22%3E%3Ccircle%20cx=%2230%22%20cy=%2230%22%20r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>

			<div className="relative z-10 container mx-auto px-4 py-16">
				<div className="text-center mb-16">
					<div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-gray-600 to-gray-700 mb-6">
						<CodeBracketIcon className="w-8 h-8 text-white" />
					</div>

					<h1 className="text-5xl font-bold text-white mb-4">Monogram Coding Standards</h1>

					<p className="text-xl text-gray-300 max-w-2xl mx-auto">
						Model Context Protocol Server providing comprehensive coding standards for Next.js,
						TypeScript, and ESLint
					</p>
				</div>

				<div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
					<div className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
						<div className="flex items-center mb-4">
							<DocumentTextIcon className="w-6 h-6 text-gray-400 mr-3" />
							<h3 className="text-xl font-semibold text-white">Standards & Conventions</h3>
						</div>
						<p className="text-gray-300 mb-4">
							Get comprehensive coding standards including file naming conventions, directory
							structure, and component organization.
						</p>
						<ul className="text-sm text-gray-400 space-y-2">
							<li>• File naming patterns</li>
							<li>• Directory structure</li>
							<li>• Component organization</li>
							<li>• TypeScript best practices</li>
						</ul>
					</div>

					<div className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
						<div className="flex items-center mb-4">
							<CogIcon className="w-6 h-6 text-gray-400 mr-3" />
							<h3 className="text-xl font-semibold text-white">Code Generation</h3>
						</div>
						<p className="text-gray-300 mb-4">
							Generate code that automatically follows Monogram's coding standards and best
							practices.
						</p>
						<ul className="text-sm text-gray-400 space-y-2">
							<li>• Next.js optimizations</li>
							<li>• ESLint rule compliance</li>
							<li>• TypeScript type safety</li>
							<li>• Modern React patterns</li>
						</ul>
					</div>
				</div>

				<div className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-8 border border-gray-700 max-w-2xl mx-auto">
					<h2 className="text-2xl font-semibold text-white mb-4">Protocol Information</h2>
					<div className="space-y-3 text-gray-300">
						<div className="flex items-center">
							<span className="font-medium text-gray-400 w-20">Protocol:</span>
							<span>Model Context Protocol (MCP)</span>
						</div>
						<div className="flex items-center">
							<span className="font-medium text-gray-400 w-20">Endpoint:</span>
							<span>/mcp</span>
						</div>
						<div className="flex items-center">
							<span className="font-medium text-gray-400 w-20">Transport:</span>
							<span>HTTP</span>
						</div>
						<div className="flex items-center">
							<span className="font-medium text-gray-400 w-20">Status:</span>
							<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900 text-green-300">
								Active
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
