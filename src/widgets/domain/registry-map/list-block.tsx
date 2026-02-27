import { Button } from '@/packages/shared-ui/button/button';
import { IncidentCard } from '@/src/shared/components/incedent-card';
import { RequestCard } from '@/src/shared/components/service-card';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { View } from 'react-native';


interface Props {
    services: any,
    incidents: any,
}

export const ListBlock = observer(({ services, incidents }: Props) => {
    const [typeTable, setTypeTable] = useState<"services" | "incident">("services");

    return (
        <View>
            <View className="flex-row items-center gap-3 mb-4 ">
                {[{ name: "Заявки", value: "services" }, { name: "Аварии", value: "incident" }].map((btn, key) =>
                    <Button key={key}
                        onPress={() => setTypeTable(btn.value)}
                        className="flex-1 !py-[1px]"
                        styleColor={typeTable == btn.value ? "blue" : "grayOutline"}>
                        {btn.name}
                    </Button>
                )}
            </View>


            <View className="gap-2">
                {typeTable === "services"
                    ? services.map((item, key) => <RequestCard key={key} request={item} />)
                    : incidents.map((item, key) => <IncidentCard key={key} incident={item} />)
                }
            </View>
        </View>
    );
});



