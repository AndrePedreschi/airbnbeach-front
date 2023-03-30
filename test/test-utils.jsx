import { render } from "@testing-library/react"

import { BrowserRouter, MemoryRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "../src/contexts/auth"

const renderWithContext = (ui) => {
    return render(
        <BrowserRouter>
            <AuthProvider>
                    {ui}
            </AuthProvider>
        </BrowserRouter>
    )
}

export const renderWithRouter = (ui, { route = '/', path = '/' }) => {
    window.history.pushState({}, 'Test page', route)

    return render(
        <MemoryRouter initialEntries={[route]}>
            <Routes>
                <Route index path={path} element={ui} />
            </Routes>
        </MemoryRouter>
    )
}

export * from "@testing-library/react"
export { renderWithContext as render } 