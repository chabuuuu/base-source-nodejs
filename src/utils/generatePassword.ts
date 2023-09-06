export class GeneratePassword {
    generate(): string {
        const specialChars = '!@#$%^&*()_+[]{}|;:,.<>?';
        const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numericChars = '0123456789';

        let password = '';

        // Chọn một kí tự đặc biệt ngẫu nhiên
        password += specialChars.charAt(
            Math.floor(Math.random() * specialChars.length),
        );

        // Chọn một chữ hoa ngẫu nhiên
        password += uppercaseChars.charAt(
            Math.floor(Math.random() * uppercaseChars.length),
        );

        // Chọn một số ngẫu nhiên
        password += numericChars.charAt(
            Math.floor(Math.random() * numericChars.length),
        );

        // Lấp đầy phần còn lại của mật khẩu với ký tự ngẫu nhiên
        const remainingLength = 6 - password.length;
        const allChars = specialChars + uppercaseChars + numericChars;
        for (let i = 0; i < remainingLength; i++) {
            const randomChar = allChars.charAt(
                Math.floor(Math.random() * allChars.length),
            );
            password += randomChar;
        }

        // Trộn ngẫu nhiên các ký tự trong mật khẩu
        password = password
            .split('')
            .sort(() => Math.random() - 0.5)
            .join('');

        return password;
    }
}
