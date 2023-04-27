    .text
    .global _start

_start:
    push {r4, lr}

    mov r6, #0
loop:
    cmp r6, #3
    beq end_loop

    cmp r6, #1
    bleq add_student

    cmp r6, #2
    bleq search

    mov r0, #1
    mov r2, #(choose_end-choose) @len
    ldr r1, =choose @ input string
    mov r7, #4
    svc 0

    mov r0, #1
    mov r2, #(choose_num_end-choose_num) @len
    ldr r1, =choose_num @input string
    mov r7, #4
    svc 0

    mov r0, #0
    ldr r1, =menu_number
    mov r2, #2
    mov r7, #3
    svc 0
    ldr r6, =menu_number
    ldrb r6, [r6, #0]
    sub r6, r6, #48
    b loop

end_loop:
exit:
    pop {r4, lr}
    mov r7, #1
    svc 0

search:
    push {r4-r12, lr}

    mov r0, #1
    mov r2, #(search_stu_end-search_stu) @len
    ldr r1, =search_stu @input string
    mov r7, #4
    svc 0
    
    mov r0, #0
    ldr r1, =find_id @รับรหัสนักศึกษา
    mov r2, #9
    mov r7, #3
    svc 0

    bl open_file
    mov r4, r0

    mov r0, r4
    ldr r1, =std_info @อ่านไฟล์ stdfile
    mov r2, #10000
    mov r7, #3
    svc 0

    mov r6, #0
    mov r8, #0

loop_search:
    ldr r5, =std_info
    ldrb r5, [r5, r6]
    cmp r5, #0
    beq if_not_found_id

    ldr r9, =find_id
    ldrb r9, [r9, r8]
    cmp r5, r9
    beq char_is_equal
    b end_char_is_equal
char_is_equal:
    add r8, r8, #1
    b end_char_is_equal
char_is_not_equal:
    mov r8, #0
end_char_is_equal:

    cmp r8, #8
    beq if_all_id_match
    b end_if_id_match

if_all_id_match:
    mov r0, r6

    mov r10, r0
    add r10, r10, #2 @เลื่อนไปสองตัว

    mov r7, #4
    mov r0, #1
    mov r2, #(stu_name_end-stu_name) @len
    ldr r1, =stu_name @input string
    svc 0

loop_char_found:
    ldr r5, =std_info
    ldrb r5, [r5, r10]
    cmp r5, #'\n' @ถ้าตัวอักษรเป็น \n ให้จบการ print
    beq end_loop_char_found

    ldr r1, =char_output @print ทีละตัวออกมา
    strb r5, [r1, #0]
    ldr r1, =char_output
    mov r2, #1
    mov r7, #4
    mov r0, #1
    svc 0

    add r10, r10 ,#1
    b loop_char_found

end_loop_char_found:
    b end_loop_search
end_if_id_match:
    add r6, r6, #1
    b loop_search
if_not_found_id:
    mov r0, #1
    mov r2, #(no_stu_end-no_stu) @len
    ldr r1, =no_stu @input string
    mov r7, #4
    svc 0
end_loop_search:
    bl close_file
    mov r0, r4
    pop {r4-r12, lr}
    bx lr
add_student:
    push {r4-r12, lr}

    mov r0, #1
    mov r2, #(num_stu_end-num_stu) @len
    ldr r1, =num_stu @input string
    mov r7, #4
    svc 0

    bl open_file
    mov r4, r0

    mov r0, r4
    mov r1, #0 
    mov r2, #2
    mov r7, #19 @seek
    svc 0

    mov r0, #0
    ldr r1, =buffer @scanf
    mov r2, #10
    mov r7, #3
    svc 0

    mov r0, r4
    ldr r1, =buffer @writeofile
    mov r2, #8
    mov r7, #4
    svc 0

    mov r0, r4
    ldr r1, =empty @write empty
    mov r2, #1
    mov r7, #4
    svc 0

    mov r0, #1
    mov r2, #(name_stu_end-name_stu) @len
    ldr r1, =name_stu @input string
    mov r7, #4
    svc 0

    mov r0, #0
    ldr r1, =buffer @scanf
    mov r2, #81
    mov r7, #3
    svc 0

    mov r2, r0
    mov r0, r4
    ldr r1, =buffer @writetofile
    mov r7, #4
    svc 0

    bl close_file
    mov r0, r4

    pop {r4-r12, lr}
    bx lr

open_file:
    push {r4-r12, lr}
    ldr r0, =txtpath
    mov r1, #0x42
    mov r2, #384
    mov r7, #5
    svc 0

    cmp r0, #-1
    beq fail_to_open
    pop {r4-r12, lr}
    bx lr 
fail_to_open:
    bl close_file
    b exit
close_file:
    push {r4-r12, lr}

    mov r0, #0
    mov r1, #0
    mov r2, #0
    mov r3, #0
    mov r4, #0
    mov r4, #6
    svc 0

    pop {r4-r12, lr}
    bx lr

.data
.balign 4
choose: .asciz "\n***********************Choose Menu*************************\n"
choose_end:

.balign 4
choose_num: .asciz "1.Add Student \n2.Search Student \n3.Exit \n:"
choose_num_end:

.balign 4
num_stu: .asciz "Enter Number Student\n:"
num_stu_end:

.balign 4 
name_stu: .asciz "Enter Name Student\n:"
name_stu_end:

.balign 4
stu_name: .asciz "Student Name:"
stu_name_end:

.balign 4
no_stu: .asciz "No student Not found"
no_stu_end:

.balign 4
search_stu: .asciz "Enter Number Student \n:"
search_stu_end:

.balign 4
txtpath: .asciz "/home/pi/stdfile" @ที่อยู่ของไฟล์

.balign 4
find_id: .asciz " "

.balign 4
char_output: .asciz " "

.balign 4 
empty: .asciz " "

.balign 4
menu_number: .byte 1

.balign 4
buffer: .byte 90

.balign 4
std_info: .asciz " "
