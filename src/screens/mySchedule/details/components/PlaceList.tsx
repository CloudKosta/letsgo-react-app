import { useEffect, useRef, useState } from 'react';
import { GripVertical, Trash2, Plus, Save } from 'lucide-react';
import type { RouteSchedule } from '../../../../types';
import styles from './css/PlaceList.module.css';

interface PlaceListProps {
    places: RouteSchedule[];
    canEdit?: boolean;
    onAddClick?: () => void;
    onSaveOrders?: (ordered: RouteSchedule[]) => Promise<void> | void;
    onDeletePlace?: (visitItemId: string) => Promise<void> | void;
}

function PlaceList({ places, canEdit = false, onAddClick, onSaveOrders, onDeletePlace }: PlaceListProps) {
    const [items, setItems] = useState<RouteSchedule[]>(places);
    const [saving, setSaving] = useState(false);
    const [dragIndex, setDragIndex] = useState<number | null>(null);
    const listRef = useRef<HTMLDivElement>(null);

    // 부모에서 route가 갱신되면(저장/삭제 후 reload) 로컬 순서를 동기화한다.
    useEffect(() => {
        setItems(places);
    }, [places]);

    // 로컬 순서가 원본과 달라졌는지(저장 필요 여부).
    const dirty =
        items.length === places.length &&
        items.some((it, i) => it.visitId !== places[i]?.visitId);

    // 드래그 핸들을 잡으면 포인터를 캡처해 리스트 밖으로 나가도 이동을 추적한다.
    const handlePointerDown = (e: React.PointerEvent, index: number) => {
        e.preventDefault();
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        setDragIndex(index);
    };

    // 포인터 Y 위치가 어느 행의 중앙을 넘었는지 계산해 실시간으로 순서를 바꾼다.
    const handlePointerMove = (e: React.PointerEvent) => {
        if (dragIndex === null || !listRef.current) return;
        const rows = Array.from(listRef.current.querySelectorAll<HTMLElement>('[data-row]'));
        if (rows.length === 0) return;

        const y = e.clientY;
        let target = rows.length - 1;
        for (let i = 0; i < rows.length; i++) {
            const rect = rows[i].getBoundingClientRect();
            if (y < rect.top + rect.height / 2) {
                target = i;
                break;
            }
        }

        if (target !== dragIndex) {
            setItems((prev) => {
                const next = [...prev];
                const [moved] = next.splice(dragIndex, 1);
                next.splice(target, 0, moved);
                return next;
            });
            setDragIndex(target);
        }
    };

    const handlePointerUp = (e: React.PointerEvent) => {
        if (dragIndex === null) return;
        try {
            (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
        } catch {
            /* 이미 해제된 경우 무시 */
        }
        setDragIndex(null);
    };

    const handleSave = async () => {
        if (!onSaveOrders) return;
        setSaving(true);
        try {
            await onSaveOrders(items);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className={styles.list} ref={listRef}>
            {items.map((place, i) => (
                <div
                    key={place.visitId}
                    data-row
                    className={`${styles.item} ${dragIndex === i ? styles.dragging : ''}`}
                >
                    <span className={styles.order}>{i + 1}</span>
                    <span className={styles.title}>{place.title}</span>
                    {place.distanceToNext > 0 && (
                        <span className={styles.distance}>{place.distanceToNext}km</span>
                    )}
                    {canEdit && (
                        <div className={styles.actions}>
                            {onDeletePlace && (
                                <button
                                    className={styles.deleteBtn}
                                    onClick={() => onDeletePlace(place.visitId)}
                                    aria-label="장소 삭제"
                                >
                                    <Trash2 className={styles.actionIcon} />
                                </button>
                            )}
                            <button
                                className={styles.handle}
                                aria-label="드래그하여 순서 변경"
                                onPointerDown={(e) => handlePointerDown(e, i)}
                                onPointerMove={handlePointerMove}
                                onPointerUp={handlePointerUp}
                                onPointerCancel={handlePointerUp}
                            >
                                <GripVertical className={styles.handleIcon} />
                            </button>
                        </div>
                    )}
                </div>
            ))}

            {canEdit && dirty && onSaveOrders && (
                <button className={styles.saveBtn} onClick={handleSave} disabled={saving}>
                    <Save className={styles.saveIcon} />
                    {saving ? '저장 중...' : '순서 저장하기'}
                </button>
            )}

            {onAddClick && (
                <button className={styles.addBtn} onClick={onAddClick}>
                    <Plus className={styles.addIcon} />
                    장소 추가
                </button>
            )}
        </div>
    );
}

export default PlaceList;
