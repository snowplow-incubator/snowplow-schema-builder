import CreateDataProduct from "@/components/CreateDataProduct/CreateDataProduct";
import Link from "next/link";

export default async function TemplatesPage() {

    const dataProductsList = await fetch('http://localhost:3001/api/templates').then((res) =>
        res.json()
    );

    return (
        <div>
            List of templates
            <ul>
                {dataProductsList.map((dataProduct: any) => (
                    <li key={dataProduct.data[0].id}>
                        <Link href={`/data-products/${dataProduct.data[0].id}`}>{dataProduct.data[0].name}</Link>
                    </li>
                ))}
            </ul>
            <CreateDataProduct />
        </div>
    )
}