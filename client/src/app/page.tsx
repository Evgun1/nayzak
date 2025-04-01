import Hero from "@/components/page-hero/Hero";
import { PageProps } from "../../.next/types/app/page";

export default async function Home(props: PageProps) {
    return <Hero searchParams={props.searchParams} />;
}
