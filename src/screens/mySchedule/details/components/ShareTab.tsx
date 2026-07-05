import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, Send, X } from 'lucide-react';
import { useCompanions } from '../../hooks/useCompanions';
import { toast } from '../../../../store/toastStore';
import styles from './css/ShareTab.module.css';

interface ShareTabProps {
    myScheduleId: string;
    isOwner?: boolean;
}

const permissionLabel: Record<string, string> = {
    R: '읽기 가능',
    W: '편집 가능',
};

function ShareTab({ myScheduleId, isOwner = false }: ShareTabProps) {
    const navigate = useNavigate();
    const { companions, publishing, publish, addCompanion, changePermission, removeCompanion } = useCompanions(myScheduleId);
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [adding, setAdding] = useState(false);
    const [newUserId, setNewUserId] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handlePublish = async () => {
        try {
            const postId = await publish(isAnonymous);
            toast.success('공개게시판에 게시되었습니다.');
            navigate(`/postSchedule/${postId}`);
        } catch (err) {
            toast.error(err instanceof Error ? err.message : '게시에 실패했습니다.');
        }
    };

    const handleAdd = async () => {
        if (newUserId.trim() === '') return;
        setSubmitting(true);
        try {
            await addCompanion(newUserId.trim());
            setNewUserId('');
            setAdding(false);
            toast.success('동반자를 추가했습니다.');
        } catch (err) {
            toast.error(err instanceof Error ? err.message : '동반자 추가에 실패했습니다.');
        } finally {
            setSubmitting(false);
        }
    };

    const handlePermissionChange = async (sharedUserId: string, permission: string) => {
        try {
            await changePermission(sharedUserId, permission);
            toast.success('권한을 변경했습니다.');
        } catch (err) {
            toast.error(err instanceof Error ? err.message : '권한 변경에 실패했습니다.');
        }
    };

    const handleRemove = async (sharedUserId: string, name: string) => {
        if (!window.confirm(`'${name}' 님을 동반자에서 제외할까요?`)) return;
        try {
            await removeCompanion(sharedUserId);
            toast.success('동반자를 제외했습니다.');
        } catch (err) {
            toast.error(err instanceof Error ? err.message : '동반자 삭제에 실패했습니다.');
        }
    };

    return (
        <div className={styles.wrapper}>
            <section className={styles.card}>
                <div className={styles.cardHeader}>
                    <h3 className={styles.cardTitle}>동반자</h3>
                    {isOwner && (
                        <button className={styles.addBtn} onClick={() => setAdding((v) => !v)}>
                            <UserPlus className={styles.addIcon} />
                            추가
                        </button>
                    )}
                </div>

                {isOwner && adding && (
                    <div className="flex gap-2 mb-3">
                        <input
                            value={newUserId}
                            onChange={(e) => setNewUserId(e.target.value)}
                            placeholder="공유할 사용자 아이디"
                            className="flex-1 h-[42px] bg-[#f8f9fa] border border-[#e9ecef] rounded-xl px-3 text-[14px] outline-none focus:border-[#ff7a00] focus:bg-white"
                        />
                        <button
                            type="button"
                            onClick={handleAdd}
                            disabled={submitting}
                            className="px-4 rounded-xl bg-[#ff7a00] text-white text-sm font-bold disabled:opacity-60"
                        >
                            {submitting ? '추가 중...' : '추가'}
                        </button>
                    </div>
                )}

                {companions.length === 0 ? (
                    <p className={styles.empty}>아직 동반자가 없습니다.</p>
                ) : (
                    <ul className={styles.companionList}>
                        {companions.map((c) => (
                            <li key={c.userId} className={styles.companion}>
                                <span className={styles.avatar}>{c.name.charAt(0)}</span>
                                <span className={styles.name}>{c.name}</span>
                                {isOwner ? (
                                    <>
                                        <select
                                            value={c.permission}
                                            onChange={(e) => handlePermissionChange(c.userId, e.target.value)}
                                            className="ml-auto bg-[#f8f9fa] border border-[#e9ecef] rounded-lg px-2 py-1 text-[13px] outline-none focus:border-[#ff7a00]"
                                        >
                                            <option value="R">읽기 가능</option>
                                            <option value="W">편집 가능</option>
                                        </select>
                                        <button
                                            type="button"
                                            onClick={() => handleRemove(c.userId, c.name)}
                                            className={styles.removeBtn}
                                            aria-label={`${c.name} 동반자 제외`}
                                        >
                                            <X className={styles.removeIcon} />
                                        </button>
                                    </>
                                ) : (
                                    <span className={styles.permission}>
                                        {permissionLabel[c.permission] ?? c.permission}
                                    </span>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </section>

            <section className={styles.card}>
                <h3 className={styles.cardTitle}>공개게시판에 게시</h3>

                <label className={styles.checkboxRow}>
                    <input
                        type="checkbox"
                        checked={isAnonymous}
                        onChange={(e) => setIsAnonymous(e.target.checked)}
                        className={styles.checkbox}
                    />
                    익명으로 게시
                </label>

                <button
                    className={styles.publishBtn}
                    onClick={handlePublish}
                    disabled={publishing}
                >
                    <Send className={styles.publishIcon} />
                    {publishing ? '게시 중...' : '게시하기'}
                </button>
            </section>
        </div>
    );
}

export default ShareTab;
