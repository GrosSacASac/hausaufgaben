class LinkedList:
    
    def __init__(self):
        self.head = None
    
    def get(self, index: int) -> int:
        return self.head.get(index)

    def insertHead(self, val: int) -> None:
        head = LinkedListItem()
        head.value = val
        head.next = self.head
        self.head = head


    def insertTail(self, val: int) -> None:
        if (not(self.head)):
            return self.insertHead(val)
        current = self.head
        while (current.next):
            current = next
        tail = LinkedListItem()
        tail.value = val
        current.next = tail
        

    def remove(self, index: int) -> bool:
        if (index > 0 and self.head.next):
            return self.head.remove(index)
        if (index == 0):
            if (self.head):
                self.head = self.head.next
                return True
            return False
        return False
        

    def getValues(self) -> List[int]:
        acc = []
        current = self.head
        while (current):
            acc.append(current.value)
            current = current.next
        return acc

class LinkedListItem:
    
    def __init__(self):
        self.head = None
        self.next = None
    
    def get(self, index: int) -> int:
        if (index > 0 and self.next):
            return self.next.get(index - 1)
        if (index == 0):
            return self.value
        return -1

    def remove(self, index: int) -> bool:
        if (index > 1 and self.next):
            return self.next.remove(index - 1)
        if (index == 1 and self.next):
            newNext = None
            if (self.next.next):
                newNext = self.next.next
            self.next = newNext
            return True
        return False
        

l = LinkedList()
# l.insertHead(1)
# l.insertTail(2)
# l.insertHead(0) 
# l.remove(1) 
# print(l.getValues())

print(l.insertHead(1))
print(l.insertHead(2))
print(l.get((5)))
# print(l.getValues())