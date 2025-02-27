import axios from "axios";

interface Request {
    method: string;
    url: string;
    headers: Record<string, string>;
    body?: Record<string, unknown>;
}

interface Response {
    status: (code: number) => Response;
    json: (body: Record<string, unknown>) => void;
}

export default async function handler(req: Request, res: Response) {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/`);
        res.status(200).json({ message: response.data });
    } catch {
        res.status(500).json({ error: "Backend connection failed" });
    }
}
