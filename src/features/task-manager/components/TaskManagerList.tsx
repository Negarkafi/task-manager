import { useAppSelector } from '@app/app/hooks';
import { TaskManagerItem } from '@app/features/task-manager/components/TaskManagerItem';
import { selectAllTasks } from '@app/features/task-manager/taskSlice';
import { useCallback, useEffect, useRef, useState } from 'react';

interface Props {
  onEditTask: (taskId: string) => void;
}

const itemHeight = 170;
const buffer = 3;

export const TaskManagerList = ({ onEditTask }: Props) => {
  const tasks = useAppSelector(selectAllTasks);

  const containerRef = useRef<HTMLDivElement>(null);
  const [visiblity, setVisiblity] = useState<{ start: number; end: number }>({ start: 0, end: 10 });

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;

    const scrollTop = containerRef.current.scrollTop;
    const containerHeight = containerRef.current.clientHeight;
    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - buffer);
    const endIndex = Math.min(tasks.length, Math.ceil((scrollTop + containerHeight) / itemHeight) + buffer);

    setVisiblity({ start: startIndex, end: endIndex });
  }, [tasks.length]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <section className="task-manager__task-list" ref={containerRef}>
      <div style={{ height: `${tasks.length * itemHeight}px`, position: 'relative' }}>
        {tasks.slice(visiblity.start, visiblity.end).map((task, index) => (
          <div
            key={task.id}
            style={{
              position: 'absolute',
              top: `${(visiblity.start + index) * itemHeight}px`,
              width: '100%',
            }}
          >
            <TaskManagerItem {...task} onEditTask={onEditTask} />
          </div>
        ))}
      </div>
    </section>
  );
};
