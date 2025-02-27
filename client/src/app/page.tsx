import { PageProps } from '../../.next/types/app/layout';
import Hero from '@/components/page-hero/Hero';

export default async function Home(props: PageProps) {
	return <Hero searchParams={props.searchParams} />;
}
