import { useState } from "react";
import { View, Text, TouchableOpacity, Modal, Pressable } from "react-native";
import { Icon } from "../icon";
import { TableFooterProps } from "./types";

export function TableFooter<T>({
    table,
    pageSizeOptions,
    pageIndex,
    pageSize,
    onPageChange,
    onPageSizeChange,
}: TableFooterProps<T>) {
    const [open, setOpen] = useState(false);

    const total = table.getFilteredRowModel().rows.length;
    const start = pageIndex * pageSize;
    const end = start + table.getRowModel().rows.length;

    const canPrev = table.getCanPreviousPage();
    const canNext = table.getCanNextPage();

    return (
        <View className="w-full pb-10 mt-5">
            <View className="flex flex-row items-center gap-5 justify-center">
                {/* PAGE SIZE LABEL */}
                <Text className="text-[#717171] text-[14px]">
                    Количество элементов на странице
                </Text>

                {/* PAGE SIZE SELECT */}
                <View className="relative">
                    <TouchableOpacity
                        className="flex flex-row items-center border-b border-[#717171]"
                        onPress={() => setOpen((v) => !v)}
                    >
                        <Text className="text-[#717171]">{pageSize}</Text>
                        <Icon
                            systemName="arrow-triangle"
                            className={`ml-3 mb-1 transition-transform ${open ? "rotate-180" : ""}`}
                        />
                    </TouchableOpacity>

                    {/* Dropdown Modal */}
                    <Modal
                        visible={open}
                        transparent
                        animationType="none"
                        onRequestClose={() => setOpen(false)}
                    >
                        <Pressable className="flex-1" onPress={() => setOpen(false)}>
                            <View className="absolute bottom-10 right-0 bg-stone-50 rounded-lg shadow-lg p-2 z-10">
                                {pageSizeOptions.map((size) => (
                                    <Pressable
                                        key={size}
                                        className="py-2 px-4 hover:bg-gray-100"
                                        onPress={() => {
                                            onPageSizeChange(size);
                                            onPageChange(0);
                                            setOpen(false);
                                        }}
                                    >
                                        <Text className="text-[#717171]">{size}</Text>
                                    </Pressable>
                                ))}
                            </View>
                        </Pressable>
                    </Modal>
                </View>

                {/* RANGE */}
                <Text className="text-[#717171] text-[14px]">
                    {total === 0
                        ? "0–0 из 0"
                        : `${start + 1}-${Math.min(end, total)} из ${total}`}
                </Text>

                {/* PREV BUTTON */}
                <TouchableOpacity
                    className={`border rounded-md p-2 flex items-center ${!canPrev ? "opacity-40" : "opacity-100"
                        }`}
                    disabled={!canPrev}
                    onPress={() => canPrev && onPageChange(pageIndex - 1)}
                >
                    <Icon
                        width={12}
                        height={12}
                        systemName={`table-arrow${canPrev ? "-active" : ""}`}
                        className="rotate-180"
                    />
                </TouchableOpacity>

                {/* NEXT BUTTON */}
                <TouchableOpacity
                    className={`border rounded-md p-2 flex items-center ${!canNext ? "opacity-40" : "opacity-100"
                        }`}
                    disabled={!canNext}
                    onPress={() => canNext && onPageChange(pageIndex + 1)}
                >
                    <Icon
                        width={12}
                        height={12}
                        systemName={`table-arrow${canNext ? "-active" : ""}`}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}
