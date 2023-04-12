import { useState, useEffect } from 'react';
import './DragAndDrop.scss'
import {
    DndContext,
    DragOverlay,
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { Item } from "../utils/DragAndDrop/Item";
import { arrayMove, insertAtIndex, removeAtIndex } from "../utils/DragAndDrop/array";
import { Droppable } from '../utils/DragAndDrop/Droppable';


export function DragAndDrop({ filteredData }) {
    const [itemGroups, setItemGroups] = useState({
        group1: ["Wi-fi", "Piscina", "Pets", "TV", "Cozinha", "Estacionamento", "Jacuzzi", "Ar-condicionado"],
        group2: [],
    });
    const [activeId, setActiveId] = useState(null);

    useEffect(() => {

        let caracteristicasId = [
            {
                id: 1,
                nome: "Wi-Fi",
                icone: 'wi-fi'
            },
            {
                id: 2,
                nome: "Piscina",
                icone: 'pool'
            },
            {
                id: 3,
                nome: "Pets",
                icone: 'pets'
            },
            {
                id: 4,
                nome: "TV",
                icone: 'tv'
            },
            {
                id: 5,
                nome: "Cozinha",
                icone: 'kitchen'
            },
            {
                id: 6,
                nome: "Estacionamento",
                icone: 'parking'
            },
            {
                id: 7,
                nome: "Jacuzzi",
                icone: 'jacuzzi'
            },
            {
                id: 8,
                nome: "Ar-condicionado",
                icone: 'air-conditioning'
            }
        ]
        let arrayCaracteristicas = []   
     
        caracteristicasId.forEach((item) => {
            if (itemGroups.group2.includes(item.nome)) {
                return arrayCaracteristicas.push({nome: item.nome})
            }
        })
        filteredData(arrayCaracteristicas)
    }, [itemGroups])


    const sensors = useSensors(
        useSensor(MouseSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragStart = ({ active }) => {
        setActiveId(active.id)
    };

    const handleDragCancel = () => {
        setActiveId(null)
    };

    const handleDragOver = ({ active, over }) => {
        const overId = over?.id;

        if (!overId) {
            return;
        }

        const activeContainer = active.data.current.sortable.containerId;
        const overContainer = over.data.current?.sortable.containerId || over.id;

        if (activeContainer !== overContainer) {
            setItemGroups((itemGroups) => {
                const activeIndex = active.data.current.sortable.index;
                const overIndex =
                    over.id in itemGroups
                        ? itemGroups[overContainer].length + 1
                        : over.data.current.sortable.index;

                return moveBetweenContainers(
                    itemGroups,
                    activeContainer,
                    activeIndex,
                    overContainer,
                    overIndex,
                    active.id
                );
            });
        }
    };

    const handleDragEnd = ({ active, over }) => {
        if (!over) {
            setActiveId(null);
            return;
        }

        if (active.id !== over.id) {
            const activeContainer = active.data.current.sortable.containerId;
            const overContainer = over.data.current?.sortable.containerId || over.id;
            const activeIndex = active.data.current.sortable.index;
            const overIndex =
                over.id in itemGroups
                    ? itemGroups[overContainer].length + 1
                    : over.data.current.sortable.index;

            setItemGroups((itemGroups) => {
                let newItems;
                if (activeContainer === overContainer) {
                    newItems = {
                        ...itemGroups,
                        [overContainer]: arrayMove(
                            itemGroups[overContainer],
                            activeIndex,
                            overIndex
                        ),
                    };
                } else {
                    newItems = moveBetweenContainers(
                        itemGroups,
                        activeContainer,
                        activeIndex,
                        overContainer,
                        overIndex,
                        active.id
                    );
                }
                return newItems;
            });
        }
        setActiveId(null);
    };

    const moveBetweenContainers = (
        items,
        activeContainer,
        activeIndex,
        overContainer,
        overIndex,
        item
    ) => {
        return {
            ...items,
            [activeContainer]: removeAtIndex(items[activeContainer], activeIndex),
            [overContainer]: insertAtIndex(items[overContainer], overIndex, item),
        };
    };

    return (
        <section className='dragAndDropContainer'>
            <p className='text-normal'>Clique e arraste os itens que deseja adicionar:</p>
            <DndContext
                sensors={sensors}
                onDragStart={handleDragStart}
                onDragCancel={handleDragCancel}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
            >
                <div className="container">
                    {Object.keys(itemGroups).map((group) => (
                        <Droppable
                            id={group}
                            items={itemGroups[group]}
                            activeId={activeId}
                            key={group}
                        />
                    ))}
                </div>
                <DragOverlay>{activeId ? <Item id={activeId} dragOverlay /> : null}</DragOverlay>
            </DndContext>
        </section>
    )
}